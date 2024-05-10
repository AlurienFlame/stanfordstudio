import Image from 'next/image';
import Link from 'next/link';
import { Session } from '@supabase/supabase-js';
import { supabase } from './supabaseClient';

export default function Nav({ session }: { session: Session | null; }) {

  // Extract name from email
  const name = session?.user.email?.split('@')[0];

  // Function to handle sign out confirmation
  const handleSignOut = () => {
    const confirmSignOut = window.confirm('Do you want to sign out?');
    if (confirmSignOut) {
      console.log('Signing out...'); // Replace this with your sign-out logic
      supabase.auth.signOut();
    }
  };

  return (
    <div className="flex w-full bg-paper justify-center border-b-2 border-solid border-paper-2">
      <div className="w-11/12">
        <div className="flex max-w-[1800px] justify-between items-center h-[90px]">
          <div className="flex justify-center items-center">
            <Link href="/">
              <Image src="img/SSLogo2.svg" alt="Stanford Studio" height={1} width={220} />
            </Link>
          </div>
          <div className='flex gap-4'>
            <Link href={session ? "/submit" : "/login"}>
              <div className="text-paper-3 py-3 w-[180px] bg-paper rounded-lg border border-solid border-paper-3 text-center">Post My Project</div>
            </Link>

             {/* Conditionally render login/logout */}
             {session ? (
              <button className="text-paper py-3 w-[180px] bg-cardinal rounded-lg font-bold text-center" onClick={handleSignOut}>@{name}</button>
            ) : (
              <Link href="/login">
                <div className="text-paper py-3 w-[180px] bg-cardinal rounded-lg font-bold text-center">Login</div>
              </Link>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}
