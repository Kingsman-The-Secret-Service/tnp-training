<?php
// Database details
$db_server   = 'localhost';
$db_username = 'root';
$db_password = 'root';
$db_name     = 'crud';

// Get job (and id)
$job = '';
$id  = '';
if (isset($_GET['job'])){
  $job = $_GET['job'];
  if ($job == 'get_victims' ||
      $job == 'get_victim'   ||
      $job == 'add_victim'   ||
      $job == 'edit_victim'  ||
      $job == 'delete_victim'){
    if (isset($_GET['id'])){
      $id = $_GET['id'];
      if (!is_numeric($id)){
        $id = '';
      }
    }
  } else {
    $job = '';
  }
}

// Prepare array
$mysql_data = array();

// Valid job found
if ($job != ''){
  
  // Connect to database
  $db_connection = mysqli_connect($db_server, $db_username, $db_password, $db_name);
  if (mysqli_connect_errno()){
    $result  = 'error';
    $message = 'Failed to connect to database: ' . mysqli_connect_error();
    $job     = '';
  }
  
  // Execute job
  if ($job == 'get_victims'){
    
    // Get victims
    $query = "SELECT * FROM victims ORDER BY no";
    $query = mysqli_query($db_connection, $query);
    if (!$query){
      $result  = 'error';
      $message = 'query error';
    } else {
      $result  = 'success';
      $message = 'query success';
      while ($victim = mysqli_fetch_array($query)){
        $functions  = '<div class="function_buttons"><ul>';
        $functions .= '<li class="function_edit"><a data-id="'   . $victim['id'] . '" data-name="' . $victim['name'] . '"><span>Edit</span></a></li>';
        $functions .= '<li class="function_delete"><a data-id="' . $victim['id'] . '" data-name="' . $victim['name'] . '"><span>Delete</span></a></li>';
        $functions .= '</ul></div>';
        $mysql_data[] = array(
          "no"          => $victim['no'],
          "name"        => $victim['name'],
          "gender"      => $victim['gender'],
          "address"     => $victim['address'],
          "mobile"      => $victim['mobile'],
          "location"    => $victim['location'],
          "status"      => $victim['status'],
          "date"        => date("Y-m-d",strtotime($victim['date'])),
          "functions"   => $functions
        );
      }
    }
    
  } elseif ($job == 'get_victim'){
    
    // Get victim
    if ($id == ''){
      $result  = 'error';
      $message = 'id missing';
    } else {
      $query = "SELECT * FROM victims WHERE id = '" . mysqli_real_escape_string($db_connection, $id) . "'";
      $query = mysqli_query($db_connection, $query);
      if (!$query){
        $result  = 'error';
        $message = 'query error';
      } else {
        $result  = 'success';
        $message = 'query success';
        while ($victim = mysqli_fetch_array($query)){
          $mysql_data[] = array(
            "no"        => $victim['no'],
            "name"      => $victim['name'],
            "gender"    => $victim['gender'],
            "address"   => $victim['address'],
            "mobile"    => $victim['mobile'],
            "location"  => $victim['location'],
            "status"    => $victim['status'],
            "date"      => date("Y-m-d", strtotime($victim['date'])),
          );
        }
      }
    }
  
  } elseif ($job == 'add_victim'){
    
    // Add victim
    $query = "INSERT INTO victims SET ";
    if (isset($_GET['no']))         { $query .= "no         = '" . mysqli_real_escape_string($db_connection, $_GET['no'])         . "', "; }
    if (isset($_GET['name'])) { $query .= "name = '" . mysqli_real_escape_string($db_connection, $_GET['name']) . "', "; }
    if (isset($_GET['gender']))   { $query .= "gender   = '" . mysqli_real_escape_string($db_connection, $_GET['gender'])   . "', "; }
    if (isset($_GET['address']))      { $query .= "address      = '" . mysqli_real_escape_string($db_connection, $_GET['address'])      . "', "; }
    if (isset($_GET['mobile']))  { $query .= "mobile  = '" . mysqli_real_escape_string($db_connection, $_GET['mobile'])  . "', "; }
    if (isset($_GET['location']))    { $query .= "location    = '" . mysqli_real_escape_string($db_connection, $_GET['location'])    . "', "; }
    if (isset($_GET['status']))   { $query .= "status   = '" . mysqli_real_escape_string($db_connection, $_GET['status'])   . "', "; }
    if (isset($_GET['date'])) { $query .= "date = '" . mysqli_real_escape_string($db_connection, date("Y-m-d", strtotime($_GET['date']))) . "'";   }
    $query = mysqli_query($db_connection, $query);
    if (!$query){
      $result  = 'error';
      $message = 'query error';
    } else {
      $result  = 'success';
      $message = 'query success';
    }
  
  } elseif ($job == 'edit_victim'){
    
    // Edit victim
    if ($id == ''){
      $result  = 'error';
      $message = 'id missing';
    } else {
      $query = "UPDATE victims SET ";
      if (isset($_GET['no']))         { $query .= "no         = '" . mysqli_real_escape_string($db_connection, $_GET['no'])         . "', "; }
      if (isset($_GET['name'])) { $query .= "name = '" . mysqli_real_escape_string($db_connection, $_GET['name']) . "', "; }
      if (isset($_GET['gender']))   { $query .= "gender   = '" . mysqli_real_escape_string($db_connection, $_GET['gender'])   . "', "; }
      if (isset($_GET['address']))      { $query .= "address      = '" . mysqli_real_escape_string($db_connection, $_GET['address'])      . "', "; }
      if (isset($_GET['mobile']))  { $query .= "mobile  = '" . mysqli_real_escape_string($db_connection, $_GET['mobile'])  . "', "; }
      if (isset($_GET['location']))    { $query .= "location    = '" . mysqli_real_escape_string($db_connection, $_GET['location'])    . "', "; }
      if (isset($_GET['status']))   { $query .= "status   = '" . mysqli_real_escape_string($db_connection, $_GET['status'])   . "', "; }
      if (isset($_GET['date'])) { $query .= "date = '" . mysqli_real_escape_string($db_connection,date("Y-m-d", strtotime($_GET['date']))) . "'";   }
      $query .= "WHERE id = '" . mysqli_real_escape_string($db_connection, $id) . "'";
      $query  = mysqli_query($db_connection, $query);
      if (!$query){
        $result  = 'error';
        $message = 'query error';
      } else {
        $result  = 'success';
        $message = 'query success';
      }
    }
    
  } elseif ($job == 'delete_victim'){
  
    // Delete victim
    if ($id == ''){
      $result  = 'error';
      $message = 'id missing';
    } else {
      $query = "DELETE FROM victims WHERE id = '" . mysqli_real_escape_string($db_connection, $id) . "'";
      $query = mysqli_query($db_connection, $query);
      if (!$query){
        $result  = 'error';
        $message = 'query error';
      } else {
        $result  = 'success';
        $message = 'query success';
      }
    }
  
  }
  
  // Close database connection
  mysqli_close($db_connection);

}

// Prepare data
$data = array(
  "result"  => $result,
  "message" => $message,
  "data"    => $mysql_data
);

// Convert PHP array to JSON array
$json_data = json_encode($data);
print $json_data;
?>