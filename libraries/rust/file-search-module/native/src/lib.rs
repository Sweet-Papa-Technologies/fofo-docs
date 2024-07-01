use neon::prelude::*;
use walkdir::{WalkDir, DirEntry};
use globset::{Glob, GlobSet, GlobSetBuilder};

fn should_ignore(entry: &DirEntry, ignore_set: &GlobSet) -> bool {
    ignore_set.is_match(entry.path())
}

fn search_files(mut cx: FunctionContext) -> JsResult<JsArray> {
    // Get the arguments from JavaScript
    let js_dir = cx.argument::<JsString>(0)?.value();
    let js_ignore_patterns = cx.argument::<JsArray>(1)?;

    // Convert ignore patterns to Rust Vec<String>
    let ignore_patterns: Vec<String> = (0..js_ignore_patterns.len())
        .map(|i| {
            js_ignore_patterns
                .get::<JsString, _, _>(&mut cx, i)
                .unwrap()
                .value()
        })
        .collect();

    // Compile glob patterns
    let mut globset_builder = GlobSetBuilder::new();
    for pattern in &ignore_patterns {
        globset_builder.add(Glob::new(pattern).unwrap());
    }
    let ignore_set = globset_builder.build().unwrap();

    // Perform the file search
    let mut file_paths = Vec::new();
    for entry in WalkDir::new(&js_dir).into_iter().filter_entry(|e| !should_ignore(e, &ignore_set)) {
        if let Ok(entry) = entry {
            if entry.file_type().is_file() {
                if let Some(path_str) = entry.path().to_str() {
                    file_paths.push(path_str.to_string());
                }
            }
        }
    }

    // Convert the results to a JavaScript array
    let js_array = JsArray::new(&mut cx, file_paths.len() as u32);
    for (i, path) in file_paths.iter().enumerate() {
        let js_string = cx.string(path);
        js_array.set(&mut cx, i as u32, js_string)?;
    }

    Ok(js_array)
}

register_module!(mut cx, {
    cx.export_function("searchFiles", search_files)
});