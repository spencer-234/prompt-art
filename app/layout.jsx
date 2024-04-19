import "@styles/globals.scss";
import Navbar from "@components/Navbar/Navbar";
import Provider from "@components/Provider/Provider";

export const metadata = {
  title: "Prompt Art",
  desc: "Share your AI generated images and their prompts!",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icon.png" />
      </head>
      <body>
        <Provider>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
