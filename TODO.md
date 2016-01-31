1. Nest the CellGrid and Status under a parent component that will hold
the application state (CellGridView). This way the GridSizeSelector
does not need to be re-rendered.
2. Use a responsive &lt;canvas&gt; element in CellGrid for better performance. I
believe the DOM reflows and repaints on selecting large grid sizes is hurting
performance.
