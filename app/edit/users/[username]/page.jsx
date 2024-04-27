"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const EditUser = () => {
  const { data: session, status } = useSession();
  const sessionUsername = session?.user.email.split("@")[0];
  const [profileInfo, setProfileInfo] = useState({
    username: sessionUsername,
  });

  return (
    <>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "unauthenticated" ? (
        redirect("/")
      ) : (
        <section>
          <h2>Edit Profile</h2>
          <Image src={session?.user.image} width={50} height={50} />
          <label>
            <span>Username</span>
            <input
              defaultValue={profileInfo.username}
              onChange={(e) =>
                setProfileInfo({ ...profileInfo, username: e.target.value })
              }
            />
          </label>
        </section>
      )}
    </>
  );
};

export default EditUser;
