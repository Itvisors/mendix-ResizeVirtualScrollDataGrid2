package aiden_interfaces.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.mendix.core.Core;
import com.mendix.logging.ILogNode;
import com.mendix.systemwideinterfaces.core.IContext;
import com.mendix.systemwideinterfaces.core.IMendixObject;

import aiden_interfaces.proxies.ServiceResponseElement;
import aiden_interfaces.proxies.constants.Constants;
import system.proxies.HttpHeader;


public class CustomWebServiceClient {
	private final String CLASS_NAME = getClass().getSimpleName();	
	private final ILogNode lognode = Core.getLogger(Constants.getLOGNODE_CUSTOM_WEB_SERVICE());
	private boolean traceEnabled = lognode.isTraceEnabled();
	private boolean debugEnabled = lognode.isDebugEnabled();
	private final IContext context;

	public CustomWebServiceClient() {
		super();
		
		// Use a system context to avoid user context issues in scheduled events
		context = Core.createSystemContext();	
	}
	
	public IMendixObject callWebService(String url, List<HttpHeader> mxHeaders, String basicAuthUserID, String basicAuthPassword, String requestBody, String soapAction, long connectionTimeout, long requestTimeout) throws IOException, InterruptedException {
		String logPrefix = CLASS_NAME + ".callWebService ";
		
		if (url == null || url.trim().isEmpty()) {
			throw new IllegalArgumentException("URL parameter must be set");
		}
		if (requestBody == null || requestBody.trim().isEmpty()) {
			throw new IllegalArgumentException("Request body parameter must be set");
		}
		boolean hasBasicAuthUserID = basicAuthUserID != null && !basicAuthUserID.trim().isEmpty();
		boolean hasBasicAuthPassword = basicAuthPassword != null && !basicAuthPassword.trim().isEmpty();
		if (hasBasicAuthUserID && !hasBasicAuthPassword) {
			throw new IllegalArgumentException("When basic auth user ID is set, password must be set as well");
		}
		if (hasBasicAuthPassword && !hasBasicAuthUserID) {
			throw new IllegalArgumentException("When basic auth password is set, user ID must be set as well");
		}
		
		if (debugEnabled) {
			lognode.debug(logPrefix + "Start for url " + url);
		}
		
        HttpClient.Builder clientBuilder = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(connectionTimeout));
        
		if (hasBasicAuthUserID) {
			if (traceEnabled) {
				lognode.trace(logPrefix + "Add basic authentication header");
			}
			clientBuilder.authenticator(new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(
                        basicAuthUserID,
                        basicAuthPassword.toCharArray()
                    );
                }
            });
		}
                
        HttpClient client   = clientBuilder.build();

		HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
		        .uri(URI.create(url));
				
		for (HttpHeader header : mxHeaders) {
			if (traceEnabled) {
				lognode.trace(logPrefix + "Add header " + header.getKey() + ": " + header.getValue());
			}
			requestBuilder.header(header.getKey(), header.getValue());
		}
		
		
		
		if (soapAction != null) {
			requestBuilder.header("SOAPAction", soapAction); 
		}
		
		requestBuilder.timeout(Duration.ofSeconds(requestTimeout));
		        
		requestBuilder.POST(HttpRequest.BodyPublishers.ofString(requestBody));
		        
		HttpRequest request = requestBuilder.build();

		HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
		String responseXml = response.body();		
		
		system.proxies.HttpResponse result = new system.proxies.HttpResponse(context);
		result.setStatusCode(response.statusCode());
		result.setContent(responseXml);
		HttpHeaders responseHeaders = response.headers();
		
		if (traceEnabled) {
			lognode.trace(logPrefix + "*** Response headers start");
		}
		responseHeaders.map().forEach((key, values) -> {
			for (String value: values) {
				HttpHeader responseHeaderMx = new HttpHeader(context);
				responseHeaderMx.setKey(key);
				responseHeaderMx.setValue(value);
				responseHeaderMx.setHttpHeaders(result);
				if (traceEnabled) {
					lognode.trace(key + ": " + value);
				}
			}
		});
		
		if (traceEnabled) {
			lognode.trace(logPrefix + "*** Response start");
			lognode.trace(responseXml);
			lognode.trace(logPrefix + "*** Response end");
		}
		
		if (debugEnabled) {
			lognode.debug(logPrefix + "Complete, response length " + responseXml.length() + " for " + url);
		}
		
		return result.getMendixObject();
		
	}
	
	public List<IMendixObject> processListResponse(String response, String responseElementName, boolean omitXmlDeclaration, boolean indentXml) throws SAXException, IOException, ParserConfigurationException, TransformerException {
		String logPrefix = CLASS_NAME + ".processListResponse ";
		
		if (debugEnabled) {
			lognode.debug(logPrefix + "Start for " + responseElementName);			
		}

		List<IMendixObject> resultList = new ArrayList<IMendixObject>();
		
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer transformer = tf.newTransformer();
		transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, omitXmlDeclaration ? "yes" : "no");
		transformer.setOutputProperty(OutputKeys.INDENT, indentXml ? "yes" : "no");
		
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setNamespaceAware(true);   // Turn on namespace processing
		DocumentBuilder builder = factory.newDocumentBuilder();

		Document document = builder.parse(new ByteArrayInputStream(response.getBytes(StandardCharsets.UTF_8)));
		NodeList list = document.getElementsByTagNameNS("*", responseElementName); 
		for (int i = 0; i < list.getLength(); i++) {
		    StringWriter writer = new StringWriter();
		    transformer.transform(
		            new DOMSource(list.item(i)),
		            new StreamResult(writer)
		    );
		    String elementXML = writer.toString();
		    if (traceEnabled) {
		    	lognode.trace(logPrefix + "*** Element XML start ***");
		    	lognode.trace(elementXML);
		    	lognode.trace(logPrefix + "*** Element XML end ***");
		    }
		    ServiceResponseElement elementMxObj = new ServiceResponseElement(context);
		    elementMxObj.setXML(elementXML);
		    resultList.add(elementMxObj.getMendixObject());
	    }
		
		if (debugEnabled) {
			lognode.debug(logPrefix + "Complete, created " + resultList.size() +  " elements for " + responseElementName);			
		}

		Core.commit(context, resultList);
		
		return resultList;
	}
		
}
