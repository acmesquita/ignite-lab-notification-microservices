import { useRef } from "react";
import Header from "../components/header";

type HeaderHandle = React.ElementRef<typeof Header>;

function Home() {
  const notificationRef = useRef<HeaderHandle>(null);

  function handleClick() {
    notificationRef.current?.hideNotification();
  }

  return (
    <>
      <Header ref={notificationRef} />
      <main onClick={handleClick}></main>
    </>
  );
}

export default Home;
