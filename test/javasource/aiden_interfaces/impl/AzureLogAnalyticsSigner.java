package aiden_interfaces.impl;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.nio.charset.StandardCharsets;

public class AzureLogAnalyticsSigner {

    public static String buildSignature(
            String sharedKeyBase64,
            String stringToSign
    ) throws Exception {

        // Step 1: Decode the base64-encoded shared key
        byte[] decodedKey = Base64.getDecoder().decode(sharedKeyBase64);

        // Step 2: Compute the HMAC SHA256 hash of the string to sign
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(decodedKey, "HmacSHA256"));
        byte[] hmacBytes = mac.doFinal(stringToSign.getBytes(StandardCharsets.UTF_8));

        // Step 3: Base64-encode the resulting hash
        String signature = Base64.getEncoder().encodeToString(hmacBytes);

        return  signature;
    }
}
