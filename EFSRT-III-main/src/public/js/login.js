function login() {
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			alert("Login successful");
			window.location.href = "/home";
		})
		.catch((error) => {
			console.error("Error:", error);
			alert("Login failed: " + error.message);
		});
}
