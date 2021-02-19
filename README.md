# Martian robots app
Welcome to Martian robots app. This app will allow you to explore the Mars surface dividing it into rectangular grids.

## Requeriments
The app has been developed with a REST API approach in mind so you would need an REST client capable of send both GET and POST requests
At the development, Postman was used for this task, but you can use any other of your preferance. Just take into account that, in order to work, the app only
accepts JSON objects for the body of the requests, further examples will be provided.

## Getting started
To use this app you first need to take in account the three agents of the proccess: 

  1. **Mars grid**: This is the rectangle your robots are going to explore and the first thing you need  to create in order to use the app.
      To do so, you need to launch to the server:
     - **"/getnewmarsterrain"**
       - **Method type**: POST
       - **Body**:
          - dimensionX <:integer> Dimension of the x axys.
          - dimensionY <:integer> Dimension of the y axys.

      Will create you a grid. Both parameters needs to be positive integers, if not the will be rounded.
      P.E:
      ```
      { 
        "dimensionX":3, 
        "dimensionY": 5 
      }
      ```
 
  2. **Robot**: The robot is the machine you can use to explore the surface. It can accept instructions and it will change its position depending on those. 
      
      You can create several different robots per grid but they will be automatically used on a sequentially descendant order by their creation and you can change into the next robot until the one you are using its lost.
      
      This condition will be met when the instructions given to the robot will took it to exceed the perimeter of the grid. Don't worry you'll be notified on the response of the request if that happens.
      
      After creating your first grid:
     - **"/getnewrobot"**
       - **Method type**: POST
       - **Body**:
          - name <:string> Name of the robot, cannot exceed 250 characters.

      Will create a new robot object and associate it to the latest grid.
      P.E:
      ```
      { 
        "name": "robot-example"
      }
      ```

  3. **Instructions**: The instructions set are assigned to the robots and they are uses to modify its location. The instructions are formed by to parameters:
     - **Initial position**: The initial position is formed by the initial coordinates of the robot in the grid and the orientation of the robot (The four cardinal points: 'N', 'E', 'S', 'W'). 
     - **Commands**: A string of characters conformed by the different commands that are going to be executed by the robot.

      They are check first in order to not execute any command not supported on the database. Have in mind that the string must not exceed 100 characters. 

      To send instructions to a robot you will need to use:
      
     - **"/executeinstructions"**
       - **Method type**: GET
       - **Query params**:
          - inPosition <:string> Conformed by three characters, it stands for x-axys-position, y-axys-position, initial-orientation respectively
          - commandString <:string> String formed by the commands, must not exceed 100 characters.
          
      Will send the chain of commands to the robot and execute them.
      P.E:
      ```
      { 
        inPosition: "11E",
        commandString: "FRRFLLFFRRFLL"
      }    
      ```
     
      After this, you will be prompted with the position of the robot and its status (in case it is lost).
      In case you lost a robot, the next robot used on the grid will ignore the command that made the previouse robot get lost.
      
## Extended API calls
Martian robots app also expose some others API calls in case you need to retrieve more information to work:

  1. **"/retrievelostrobots"**
     - **Method type**: GET
     - **Query params**: <optional> gridId <:integer>
     
     Allows to retrieve a list of the number of robots that has been lost on a grid and its data. This will include name, last known position and last known command.
     If no Id is given, it will search for the latest grid created.
     

  2. **"/createnewcommand"**
     - **Method type**: POST
     - **Body**: 
       -- name <:char> Name of the command, must be a single char,
       -- movementChange <:integer> Indicates the modification on the coordinates of the robot.
       -- directionChange <:integer> Indicates the modification on the direction of the robot, must be expresed in angle and must be a multiple of 90.
       

     Allows to retrieve a list of the number of robots that has been lost on a grid and its data. This will include name, last known position and last known command.
     If no Id is given, it will search for the latest grid created.
     
## Downloads and hosting
Ready to start exploring Mars?

The app is fully Dockerize, you can just clone the repository and build the docker image. You only are require of a .env file specificating:
  1. PORT 
  2. DATABASE_URL (being a postquesSQL database)

The application it is also hosted on Heroku and ready to use, the url should be:

```
https://martian-robots-app.herokuapp.com
```
     
     
     
     
     
     
