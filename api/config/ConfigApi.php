<?php

class ConfigApi
{
    public static $RESOURCE = 'resource';
    public static $PARAMS = 'params';
    public static $RESOURCES = [
      '' =>'ApuestasApiController#home',
      'apuesta#GET'=> 'ApuestasApiController#GetApuestas'
    ];

}

 ?>
