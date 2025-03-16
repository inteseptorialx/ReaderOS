import wp from "../resorces/main_bg.jpg";

function Wallpaper({ children }) {
  return (
    <div className="p-0 m-0 z-[-1] relative select-none">
      {" "}
      <img
        src={wp}
        className="object-cover bg-center bg-no-repeat fixed inset-0 overflow-hidden h-screen w-screen"
        alt="Background Wallpaper"
      />
      {children}
    </div>
  );
}

export default Wallpaper;
