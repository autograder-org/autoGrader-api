# Project Troubleshooting and Resolution Documentation

[<- go back](../README.md)

## Overview

This README documents various issues encountered during the setting up of the project,  integrating TypeORM and tsoa along with Node.js and TypeScript. Here I have listed the problems along with the solutions and workarounds implemented to resolve these issues.

## Issues and Resolutions

### 1. Duplicate Build Folder Issue

**Problem:** The project structure contained a nested `build` folder (`build/build`), leading to confusion and incorrect file referencing.

**Resolution:**

- Modified the build script and `tsconfig.json` to ensure the TypeScript compiler outputs files directly into the correct `build` directory at the project root.
- Verified and adjusted the script paths and build configurations to prevent nested directory creation.

### 2. Module Not Found Error

**Problem:** Encountered a `Module Not Found` error due to incorrect path resolution for imported modules in the generated `routes.js` file by `tsoa`.

**Resolution:**

- Checked the compiled output in the `build` directory for correct structure.
- Ensured that the import paths in TypeScript files are relative and correctly reference the intended modules.

### 3. ES Module Import Extensions

**Problem:** Node.js ES module system required explicit `.js` extensions in import statements, which was not handled automatically by `tsoa`.

**Resolution:**

- Explored `tsoa` configuration for an option to append `.js` in route generation (No built-in option available).
- Implemented a post-processing script to append `.js` to import paths in the generated `routes.js` file.

### 4. Top-Level Await Compatibility

**Problem:** Encountered a TypeScript error (TS1378) when using top-level `await` with CommonJS module configuration.

**Resolution:**

- Configured `tsconfig.json` to use `esnext` or compatible module system that supports top-level `await`.
- Ensured that the Node.js runtime version supports the configured module system and target.

### 5. `__dirname` Not Defined in ES Module

**Problem:** The use of `__dirname` in an ES module script caused an error, as it is not defined in ES module scope.

**Resolution:**

- Modified the script to conform to ES module syntax, using `import.meta.url` to derive `__dirname`.
- Alternatively, considered renaming the script with a `.cjs` extension to treat it as a CommonJS module but this did not work

## General Observations

- Ensuring compatibility between TypeScript configuration and Node.js runtime is crucial, especially regarding module systems and features like top-level `await`.
- Auto-generated files, such as those created by `tsoa`, may require additional steps to fit into the project's module system and structure.
- Scripting and build configuration play a significant role in project setup and should be regularly reviewed and tested.

## Conclusion

This documentation serves as a record of the key challenges faced during the project development and the approaches taken to resolve them. It provides insights into handling similar issues in TypeScript and Node.js projects, particularly those involving ES modules and auto-generated code.