"use client";

import Form from "@components/Form/Form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Create = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "unauthenticated" ? (
        redirect("/")
      ) : (
        <section>
          <Form type="Create" url="/api/post/new" session={session?.user.id} />
        </section>
      )}
    </>
  );
};

export default Create;
