import { MDXComponents } from 'mdx/types';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    h1: ({ children }) => <h1 className="pl-0">{children}</h1>,
    h2: ({ children }) => <h2 className="pl-1">{children}</h2>,
    h3: ({ children }) => <h3 className="pl-2">{children}</h3>,
    h4: ({ children }) => <h4 className="pl-3">{children}</h4>,
    h5: ({ children }) => <h5 className="pl-4">{children}</h5>,
    h6: ({ children }) => <h6 className="pl-5">{children}</h6>,
    p: ({ children }) => <p className="pl-6">{children}</p>,
    ...components,
  };
}
