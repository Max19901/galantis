<?php



if($_POST['action'] == 'feedback'){

	$recepient = "info@galantis.net.ua";
	$sitename = "Galantis Feedback";

	$name = trim($_POST["name"]);
	$phone = trim($_POST["email"]);
	$text = trim($_POST["text"]);
	$message = "Имя отправителя: $name \nE-mail: $phone \nСообщение: $text";

	$pagetitle = "Новая заявка с сайта \"$sitename\"";
	mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
}

if($_POST['action'] == 'testdrive'){

	$recepient = "info@galantis.net.ua";
	$sitename = "Galantis Test Drive";

	$name = trim($_POST["name"]);
	$email = trim($_POST["email"]);
	$phone = trim($_POST["phone"]);
	$company = trim($_POST["company"]);
	
	$message = "Имя отправителя: $name \nE-mail: $email \nТелефон: $phone \nНаправление: $company" ;

	$pagetitle = "Новая заявка с сайта \"$sitename\"";
	mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
}

?>