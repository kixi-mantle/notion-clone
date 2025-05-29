// app/layout.tsx or app/(dashboard)/layout.tsx


import NavbarWrapper from "./NavbarWrapper";

export default  function Layout({ children }: { children: React.ReactNode }) {
  


  return (
    <div>
     <NavbarWrapper/>
      {children}
    </div>
  );
}



