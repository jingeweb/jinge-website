/** Placeholder shown while a route chunk or the document dataset is still in flight. */
export function PagePending() {
  return (
    <main
      id="main-content"
      className="page-width mx-auto min-h-[70vh] w-[min(1240px,_calc(100%_-_96px))] max-[1150px]:w-[calc(100%_-_64px)] max-[700px]:w-[calc(100%_-_40px)] max-[370px]:w-[calc(100%_-_30px)]"
    />
  );
}
