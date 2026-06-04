## ResizeVirtualScrollDataGrid
Resize Virtual Scroll DataGrid2 and Gallery to the available vertical space

## Features
- Resize Virtual Scroll DataGrid2 and Gallery to the available vertical space
- Set a header height to subtract the total height of the grid header from the available space.

## Limitations
- Only works when used in parent with known height like the first and only container in a scroll container placeholder
- Dataview and layout grid use a flex-grow: 1, which prevents the widget from detecting the available height properly
- DataGrid 2 and Gallery will only pick up the configured height the first time it is rendered, resizing the browser window has no effect
- The header height must be fixed property value as it must be known before the first render of the grid
- This widget relies on Atlas Core styling that is only available when the React client is enabled

## Usage
- Use a layout like the Atlas core layouts or similar that do not wrap the placeholder in any way
- A container with class card may be used as single main element on the placeholder
- Place the widget in the placeholder or card container
- Set the height of the header content on the widget
- Set the height of the footer content on the widget, zero if no footer or row count is used
- With Atlas core styling, the Data Grid 2header itself is 69 and buttons wrapped in a controlgroup container 46
- Set the widget type correctly
- Place a DataGrid2 or Gallery in the widget container
- Do not place any other widgets next to the DataGrid 2 or Gallery
- You may use the header as normal
- Use Virtual Scrolling
- Set the page size high enough so sufficient rows are loaded also on larger screens. Usually 50 will be sufficient

## Header margin correction
The header height changes often between DataWidget module releases. To avoid having to revisit all widgets to adjust the header height, a correction can be specified using CSS:

```
// Custom variable and CSS property for ResizeVirtualDataGrid
$resize-virtualscroll-datagrid-header-margin-correction: 56;
// CSS custom property (runtime, accessible from JavaScript!)
:root {
  --resize-virtualscroll-datagrid-header-margin-correction: #{$resize-virtualscroll-datagrid-header-margin-correction};
}
```