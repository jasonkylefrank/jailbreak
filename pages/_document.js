
// Custom Document in order to use Styled Components.



// import Document from 'next/document';
// import { ServerStyleSheet } from 'styled-components';

// export default class MyDocument extends Document {
//     static async getInitialProps(ctx) {
//         const sheet = new ServerStyleSheet();
//         const originalRenderPage = ctx.renderPage;
//         try {
//             ctx.renderPage = () =>
//                 originalRenderPage({
//                     enhanceApp: (App) => (props) => 
//                         sheet.collectStyles(<App {...props} />)
//                 })
//             const initialProps = await Document.getInitialProps(ctx);
//             return {
//                 ...initialProps,
//                 styles: (
//                     <>
//                         {initialProps.styles}
//                         {sheet.getStyleElement()}
//                     </>
//                 )
//             }
//         } finally {
//             sheet.seal();
//         }
//     }
// }


// --------------
//  I made this change when I needed to add a font <link> in the <Head>... Next.js complained about
//   it when I tried to put it in the <Head> in the index.js page.
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet()
        const originalRenderPage = ctx.renderPage

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: (App) => (props) =>
                        sheet.collectStyles(<App {...props} />),
                })

            const initialProps = await Document.getInitialProps(ctx)
            return {
                ...initialProps,
                styles: (
                <>
                    {initialProps.styles}
                    {sheet.getStyleElement()}
                </>
                ),
            }
        } finally {
            sheet.seal()
        }
    }
}



// --------------
// import NextDocument from 'next/document';
// import { Html, Head, Main, NextScript } from 'next/document';
// import { ServerStyleSheet } from 'styled-components';

// Switching to a functional component version since it is preferred over the class syntax in order to
//  be compatible with React Server Components down the line.
//  I made this change when I needed to add a font <link> in the <Head>... Next.js complained about
//   it when I tried to put it in the <Head> in the index.js page.

// function Document() {
//     return (
//         <Html>
//           <Head>
//             <link
//                 rel="stylesheet"
//                 href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
//             />
//           </Head>
//           <body>
//             <Main />
//             <NextScript />
//           </body>
//         </Html>
//       )
// }

// Document.getInitialProps = async (ctx) => {
//     const sheet = new ServerStyleSheet();
//     const originalRenderPage = ctx.renderPage;

//     try {
//         ctx.renderPage = () =>
//             originalRenderPage({
//                 enhanceApp: (App) => (props) => 
//                     sheet.collectStyles(<App {...props} />)
//             })

//         const initialProps = await NextDocument.getInitialProps(ctx);
//         return {
//             ...initialProps,
//             styles: (
//                 <>
//                     {initialProps.styles}
//                     {sheet.getStyleElement()}
//                 </>
//             )
//         }
//     } finally {
//         sheet.seal();
//     }
// };

//export default Document;