import { Navbar } from "./Navbar";
import { getUser } from "../../getUser";
import { getOrganization } from "../../../drizzle/queries/organization";
import { redirect } from "next/navigation";
import { UserSchema } from "../../schemaType";
import { z } from "zod";

const NavbarWrapper = async () => {
  const user: z.infer<typeof UserSchema> & { id: string } | null | undefined = await getUser();
  if (!user) redirect("/signin");

  const orgs = await getOrganization();

  return <Navbar user={user} organizations={orgs} />;
};

export default NavbarWrapper;
