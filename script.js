
function getUid() {
    var facebookLinkInput = document.getElementById("facebookLink");
    var bgLoader = document.querySelector('.bg_loader');

    document.getElementById("userDetails").innerHTML = "";
    var link = document.getElementById("facebookLink").value;
    facebookLinkInput.value = "Đang lấy ID...";

    bgLoader.style.display = 'block';

    var apiUrl = 'api.php?id=' + encodeURIComponent(link);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if(data.status === "success") {
                var uid = data.data.idtk;
                var dateCreated = new Date(data.data.datecreate);
                var formattedDate = `${("0" + dateCreated.getHours()).slice(-2)}:${("0" + dateCreated.getMinutes()).slice(-2)}:${("0" + dateCreated.getSeconds()).slice(-2)} | ${("0" + dateCreated.getDate()).slice(-2)}/${("0" + (dateCreated.getMonth() + 1)).slice(-2)}/${dateCreated.getFullYear()}`;
                document.getElementById("coppy").value = uid;
                var gender = data.data.gender === "male" ? "Nam" : data.data.gender === "female" ? "Nữ" : "Không Xác Định";
                var birthday = data.data.birthday ? data.data.birthday.split('/').reverse().join('/').replace(/(\d{4})\/(\d{2})\/(\d{2})/, "$2/$3/$1") : "Không Xác Định";

                document.getElementById("coppy").value = uid;
                document.getElementById("userDetails").innerHTML = `
                    <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-700">Thông tin người dùng:</label>
                        <ul class="mt-2">
                            <li><strong>ID Tài khoản:</strong> ${data.data.idtk}</li>
                            <li><strong>Ngày Tạo Tài khoản:</strong> ${formattedDate}</li>
                            <li><strong>Tên Người dùng:</strong> ${data.data.name}</li>
                            <li><strong>Username Tài khoản:</strong> ${data.data.user || "Không Xác Định"}</li>
                            <li><strong>Link Tài khoản:</strong> ${data.data.link}</li>
                            <li><strong>Website:</strong> ${data.data.website || "Không Xác Định"}</li>
                            <li><strong>Ngày sinh:</strong> ${birthday}</li>
                            <li><strong>Giới tính:</strong> ${gender}</li>
                            <li><strong>Địa Chỉ :</strong> ${data.data.location || "Không Xác Định"}</li>
                            <li><strong>Mối Quan Hệ :</strong> ${data.data.relationship || "Không Xác Định"}</li>
                            <li><strong>Múi Giờ :</strong> ${data.data.timezone || "Không Xác Định"}</li>
                            <li><strong>Quốc Gia :</strong> ${data.data.locale}</li>
                            <li><strong>Số lượng Người theo dõi:</strong> ${data.data.follow}</li>
                        </ul>
                    </div>
                `;
                bgLoader.style.display = 'none';
                facebookLinkInput.value = `${uid}`;
            } else {
                facebookLinkInput.value = "";
                bgLoader.style.display = 'none';
                displayError("Đã xảy ra lỗi khi lấy dữ liệu.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            displayError('Đã xảy ra lỗi khi lấy dữ liệu.');
            bgLoader.style.display = 'none';
        });
}



