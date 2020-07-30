
# Wroking Process

## Our Process

We are using Scrum which you can research at [Agile Scrum](https://www.mountaingoatsoftware.com/agile/scrum
"Algile Scrum")

We are using 2 weeks Sprint (from Tuesday of the first week to Saturday of the second week)

There are 3 types of meeting that require all members:

* Sprint Planning (8PM on the first Tuesday - the first day of sprint)
* Daily (8PM on Thursday and Saturday of the first week, Tuesday and Thursday of the second week)
* Sprint Review/Retrospective (8PM on the second Saturday - the last day of sprint)

## Our Resources

* Project management tool : [Trello](https://trello.com/b/sP1r20IE/software-engineering-project-co3001"MATB")
* Version control tool : [Git](https://github.com/MATB-CO3001)
* Code editor : [Visual Studio Code](https://code.visualstudio.com/)
* Container: [Docker](https://www.docker.com/)
* Communication tool : [Facebook Messager](https://www.facebook.com/messages/t/2868407379941623)
* Meeting tool : [Google Hangouts](https://hangouts.google.com/call/uD2ha_2yZqWZ72q6-cL7AEEM"Hangout")

## Our Technical Stacks

### Frontend

* HTML
* CSS
* Javascript
* Frameworks
  * Bootstrap
  * Axios
  * Font Awesome

### Backend

* CPU Bound
  * Kotlin
  * MySQL
* Non-CPU Bound
  * NodeJS
  * MongoDB
  * Express

# Coding convention for Frontend

## For HTML and CSS files

* Code formater : [Prettier](https://prettier.io/)

  ![Pretier](https://prettier.io/icon.png)

* CSS Files :
  * Because we are using Bootstrap, we should build our site mobile-first

  * Class/ID names : replace spaces with "-", no capital, space before "{", blank line between attributes\
    _example_

  ```css
  .d-flex {
    width: 100%;
  }

  .success-popup {
    height: 1.3em;
  }
  ```

  * use class when you want to reuse attribute, comment clearly\
    _example_

  ```css
  /*overlay can be used in many parts, and position is absolute to the cover*/
  .overlay {
    height: 50vh;
    position: absolute;
  }
  ```

  * Colors : rgba or 6-digit hex\
    _example_

  ```css
  .overlay {
    background-color: rgba(0, 0, 0, 0.7)
  }
  ```

## For Javascipt files

* Naming : Camel case, use `const` to read-only constants and  `let` for variables\
  _example_

  ```javascript
  const dummyCustomer = {
    id: "123",
    fullName: "Lorem Ipsum"
  };

  let id = dummyCostumer.id;
  ```

## More on working flow

* Update progress to Git regularly

* Pull Request is required, you must make requests and review other members' requests

* Remember to move your Task ticket on Trello according to your task's state
