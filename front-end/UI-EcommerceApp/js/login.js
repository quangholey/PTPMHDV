document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Ngăn chặn form reload trang

    // Lấy dữ liệu từ form
    const name = document.querySelector('input[placeholder="Name"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    // Kiểm tra dữ liệu đầu vào
    if (!name || !password) {
        alert("Please enter both Name and Password.");
        return;
    }

    try {
        // Gửi yêu cầu GET tới API User
        const response = await fetch(
            `http://127.0.0.1:5000/get_user_credentials/${encodeURIComponent(name)}`
        );

        if (response.ok) {
            const data = await response.json();

            // Kiểm tra loại tài khoản và mật khẩu
            if (data.password_admin && data.password_admin === password) {
                alert("Welcome to the Admin Panel!");
                // Chuyển hướng đến giao diện admin
                window.location.href = "http://127.0.0.1:5501/web_ban_sach/front-end/NiceAdmin/index.html";
            } else if (data.password_user && data.password_user === password) {
                alert("Welcome to the User Panel!");
                // Chuyển hướng đến giao diện user
                window.location.href = "http://127.0.0.1:5501/web_ban_sach/front-end/Giao_dien_web%20ban_hang/index.html";
            } else {
                alert("Incorrect password. Please try again.");
            }
        } else {
            alert("Account not found. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
    }
});
