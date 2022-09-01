import { useRouter } from 'next/router'


export default function userPage() {
  const router = useRouter();
const data = router.query;
console.log("data from userPage  " +  JSON.stringify(data))

    return (
      <div>
        <h1>First Post</h1>
      </div>
    
    
    );
  }