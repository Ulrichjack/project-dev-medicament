import StoreProvider from '../store/StoreProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
