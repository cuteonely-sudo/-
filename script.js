function updateClock(){

    const now = new Date();

    const time =
        now.getFullYear() + "-" +
        String(now.getMonth()+1).padStart(2,'0') + "-" +
        String(now.getDate()).padStart(2,'0') + " " +
        String(now.getHours()).padStart(2,'0') + ":" +
        String(now.getMinutes()).padStart(2,'0');

    document.getElementById("clock").innerText = time;
}

updateClock();
setInterval(updateClock,1000);


/* 메뉴 클릭 효과 */
document.querySelectorAll(".card, .sidebar li").forEach(el=>{
    el.addEventListener("click",()=>{
        alert("해당 메뉴는 현재 시범 기능입니다.");
    });
});

/* =========================
   유저 저장 구조 (localStorage)
   users: [{id, pw, role}]
   session: {id, role}
========================= */

/* 회원가입 */
function register(){

    const id = document.getElementById("regId").value;
    const pw = document.getElementById("regPw").value;

    if(!id || !pw){
        alert("입력 필요");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.id === id);
    if(exists){
        alert("이미 존재하는 아이디");
        return;
    }

    const role = (id === "admin") ? "admin" : "user";

    users.push({id, pw, role});
    localStorage.setItem("users", JSON.stringify(users));

    alert("가입 완료");
    location.href = "login.html";
}


/* 로그인 */
function login(){

    const id = document.getElementById("userId").value;
    const pw = document.getElementById("userPw").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.id === id && u.pw === pw);

    if(!user){
        alert("로그인 실패");
        return;
    }

    localStorage.setItem("session", JSON.stringify(user));

    alert("로그인 성공");

    location.href = "index.html";
}


/* 로그인 체크 */
function checkAuth(){

    const session = JSON.parse(localStorage.getItem("session"));

    if(!session){
        location.href = "login.html";
    }

    return session;
}


/* 로그아웃 */
function logout(){
    localStorage.removeItem("session");
    location.href = "login.html";
}


/* 관리자 전용 */
function checkAdmin(){

    const session = checkAuth();

    if(session.role !== "admin"){
        alert("접근 권한 없음");
        location.href = "index.html";
    }

    return session;
}


/* 시간 */
function updateClock(){

    const now = new Date();

    document.getElementById("clock")?.innerText =
        now.toLocaleString("ko-KR");
}

setInterval(updateClock,1000);
updateClock();