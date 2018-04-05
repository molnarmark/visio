# Core concept of `visio`

visio is a command line interface to store open source project ideas that you want to do in the future.

## Commands
`visio new`
  - Will prompt the user with the following questions:
    - Project Name:
    - Project Description:
    - Project Stack:

`visio help`
 - Will output a generic help message covering every command available in visio

`visio list <filter || null>`
 - Will list the stored projects based on the filter given

`visio edit <project-name>`
 - Will give the same prompts as `visio new`

`visio view <project-name>`
 - Will output a more in-depth representation of the given project

`visio source` *(undecided)*
 - Will open up the user's default browser and go to the GitHub page of visio