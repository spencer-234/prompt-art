import "@styles/globals.scss";
import Navbar from "@components/Navbar/Navbar";

export const metadata = {
  title: "PromptArt",
  desc: "Share your AI generated images and their prompts!",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main className="app">
            <Navbar />
            {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
