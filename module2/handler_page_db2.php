<html>
<body>

<?php
$servername = "127.0.0.1"; // Do not use "localhost"

// In the Real World (TM), you should not connect using the root account.
// Create a privileged account instead.
$username = "root";

// In the Real World (TM), this password would be cracked in miliseconds.
$password = "123456";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$tname = $_POST["tname"];
$dbname = "Activity4";

mysqli_select_db($conn, $dbname) or die("Could not open the '$dbname'");

// Fixed this with prepared statements
$test_query = mysqli_prepare($conn, "SELECT * FROM ?");

mysqli_stmt_bind_param($test_query, 's', $tname);
$result = mysqli_query($conn, $test_query);

$tuple_count = 0;
while ($row = mysqli_fetch_array($result)) {
    $tuple_count++;
    
    echo "<p> You have a row with first element $row[0] and second element $row[1]";
}

echo "<p> There are $tuple_count rows";
?>

</body>
</html>