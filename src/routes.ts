import { lazy } from 'jinge';

import { PagePending } from './components/pending';

// Route chunks, kept here so navigation can preload them before the click lands.
export const loadDocument = () => import('./pages/document');
export const loadExamples = () => import('./pages/examples');
export const loadEcosystem = () => import('./pages/ecosystem');

const loading = { 'slot:loading': PagePending };

export const GuideRoute = lazy(() => loadDocument().then((mod) => mod.GuideRoute), loading);
export const ApiRoute = lazy(() => loadDocument().then((mod) => mod.ApiRoute), loading);
export const RouterRoute = lazy(() => loadDocument().then((mod) => mod.RouterRoute), loading);
export const NotFound = lazy(() => loadDocument().then((mod) => mod.NotFound), loading);
export const Examples = lazy(() => loadExamples().then((mod) => mod.Examples), loading);
export const ExampleRoute = lazy(() => loadExamples().then((mod) => mod.ExampleRoute), loading);
export const Ecosystem = lazy(() => loadEcosystem().then((mod) => mod.Ecosystem), loading);

/** Warms the chunk a navigation target needs, so the switch has nothing left to fetch. */
export const prefetchRoute = (section: string) => {
  if (section === '/examples') void loadExamples();
  else if (section === '/ecosystem') void loadEcosystem();
  else void loadDocument();
};
