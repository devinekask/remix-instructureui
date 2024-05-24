import { InstUISettingsProvider } from "@instructure/emotion";
import { generateInstanceCounterMap } from "@instructure/ui-react-utils";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
	useRouteError,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/react";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
			<InstUISettingsProvider instanceCounterMap={generateInstanceCounterMap()}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Analytics />
				</InstUISettingsProvider>
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
