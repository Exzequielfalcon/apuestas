<?php
require('libs/Smarty.class.php');
  class ViewJuego{
    private $smarty;

    function __construct(){
      $this->smarty = new Smarty();
    }

    function MostrarJuego($Apuestas, $Juego){
      $this->smarty->assign('Apuestas', $Apuestas);
      $this->smarty->assign('Juego',$Juego);
      $this->smarty->display("./../templates/Apuestas.tpl");
    }



  }
 ?>
