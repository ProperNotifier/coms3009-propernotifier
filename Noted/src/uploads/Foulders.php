<?php
$servername = "165.165.131.69";
$username = "Ern";
$password = "password";
$database = "Noted";
echo "in";
$conn = new mysqli($servername, $username, $password,$database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

$output=array();
if ($result = mysqli_query($conn, "SELECT user_id  from USERS")) {
while ($row=$result->fetch_assoc()){
$output[]= $row;

}

}


$Files=array();
foreach ($output as  $value) {
  foreach ( $value as $key => $info) {
    $Files[] = $info;

  }
}
foreach ($Files as $key => $info ) {
  if (!is_dir($info)) {
    mkdir( $info,0755);
}

}

mysqli_close($conn);


?>

