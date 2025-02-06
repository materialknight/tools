<?php

declare(strict_types=1);

function iprint(mixed $log_var = 'HERE -->', int|bool $exit = 0): void
{
   echo '<pre>' . print_r($log_var, true) . '</pre>';

   if ($exit)
   {
      exit;
   }
}

function send_json(array $unencoded): void
{
   header('Content-Type: application/json');
   echo json_encode($unencoded);
   exit;
}


class Route
{
   // The constructor is private so the class can't be instantiated.

   private function __construct()
   {
   }

   private static $GET_routes = [];

   private static $POST_routes = [];

   private static function _format(string $path): string
   {
      $path = rtrim($path, '/');

      // Each route will be used as part of a regex when you call Route::exec(),
      // but a route has one or more '/', which has special meaning in regex,
      // so first, all '/' are escaped by replacing them with '\/':

      $path = str_replace('/', '\/', $path);

      // Say you got a GET request to the route '/your/path/01', and you need to
      // respond based on that last '01'. That means you need to capture that part
      // of the route in order to pass it to the middleware.

      // To do that, write ':' and a variable name. For example, if you write:
      // Route::get(/your/path/:id)
      // ':id' would be replaced by the capture group '([-\w]+)' in the code below,
      // and when you call Route::exec(), the captured match ('01') would be passed
      // to the middelware.

      $path = preg_replace('/:[-\w]+(?=$|\/)/', '([-\w]+)', $path);

      return $path;
   }

   static function get(string $path, callable $middleware): void
   {
      $path = self::_format($path);
      self::$GET_routes[$path] = $middleware;
   }

   static function post(string $path, callable $middleware): void
   {
      $path = self::_format($path);
      self::$POST_routes[$path] = $middleware;
   }

   static function exec(): void
   {
      if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/')
      {
         return;
      }

      $method_routes = match ($_SERVER['REQUEST_METHOD'])
      {
         'GET' => self::$GET_routes,
         'POST' => self::$POST_routes
      };

      $request_URI = rtrim($_SERVER['REQUEST_URI'], '/');

      foreach ($method_routes as $route => $middleware)
      {
         if (preg_match("/^$route$/", $request_URI, $matches))
         {
            $arg = $matches[1];
            $middleware($arg);
            exit;
         }
      }

      http_response_code(404);
      echo '<h1>404 Resource Not Found</h1>';
      exit;
   }

   static function gets()
   {
      foreach (self::$GET_routes as $route => $middleware)
      {
         echo ($route);
      }
   }
}

function dummyfunc()
{
   return true;
}
