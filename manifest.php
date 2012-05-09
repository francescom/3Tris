<?php
$file = 'application.manifest';

if (file_exists($file)) {
    header('Content-Description: File Transfer');
	header('Content-Type: text/cache-manifest');
//    header('Content-Disposition: attachment; filename='.basename($file));
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    ob_clean();
    flush();
    readfile($file);
    exit;
}
?>