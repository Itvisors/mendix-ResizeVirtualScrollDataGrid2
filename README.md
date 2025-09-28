## ResizeVirtualScrollDataGrid
Resize Virtual Scroll DataGrid2 to the available vertical space

## Features
- Resize Virtual Scroll DataGrid2 to the available vertical space

## Limitation
- Only works when used in parent with known height like the first and only container in a scroll container placeholder
- Dataview and layout grid use a flex-grow: 1, which prevents the widget from detecting the available height properly
- DataGrid 2 will only pick up the configured height the first time it is rendered, resizing the browser window has no effect

## Usage
- Use a layout like the Atlas core layouts or similar that do not wrap the placeholder in any way
- A container with class card may be used as single main element on the placeholder
- Place the widget in the placeholder or card container
- Place a DataGrid2 in the widget container
- Do not place any other widgets next to the DataGrid 2
- You may use the DataGrid 2 header as normal
- Set the DataGrid 2 to use Virtual Scrolling
- Set the page size high enough so sufficient rows are loaded also on larger screens. Usually 50 will be sufficient
