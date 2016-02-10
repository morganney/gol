1. Use a responsive &lt;canvas&gt; element in CellGrid for better performance. I
believe the DOM reflows and repaints on selecting large grid sizes is hurting
performance.
2. Use external sourcemaps for builds
3. Add revs and this https://github.com/jonkemp/gulp-useref
