export const jwtTokens=(user)=>{
    const currentUser={
        email:user.email
      }
      fetch('https://shop-server-kappa.vercel.app/jwt',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(currentUser)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        localStorage.setItem('user-verify', data.token);
        
      })

}