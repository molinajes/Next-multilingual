# Overview
The reqfire frontend is developed in the `frontend/src` folder.

## Components
There are two folders for React components.  The first: `src/components` contains our original design of our application.  The second: `src/rfComponents` contains components built with the styling package `glamorous`, similar to `styled-components` or `css-in-js`.  Info about this package can be [found here](https://github.com/paypal/glamorous).  

## Atomic Design
This new design system follows the principles of Atomic Design.  Read more about this design system [here](http://bradfrost.com/blog/post/atomic-web-design/).  The basic idea is to build up basic components from `atoms` (which can be found in `src/rfComponents/_Atoms`), these are built into `molecules` (`src/rfComponents/_Molecules`) which are more useful components such as Buttons, Cards, Labels, Tables.
This system then builds up to page level components.

## Routes
The routes for the application are found under `src/routes/Routes.js`.

## State Management
The state of the application is managed by [MobX](https://mobx.js.org/).  There is a Main Store `mainStore` that contains a reference to all other stores.  Each store can be injected into a react component to give the component access to the store data.  For example, the requirements for a project are stored in `requirementStore.requirementData`.  Actions to add/edit/delete these requiements live in the `requirementStore`.


## Component Model
1. 'rule' – Business Rules
2. 'form' - Form
3. 'formproperty' – Property on a Form (Level 2)
4. 'actor' - Actor
5. 'package' - Package
6. 'object' – Business Object
7. 'objectproperty' – Property of a Business Object (Level 2)
8. 'flow' – Usecase Flow
9. 'step' – Usecase Step
10. 'usecase' - Usecase
11. 'photo' – Interface Image file
12. 'iface' - Interface
13. 'interfacetype' – Interface Category
14. 'link' – Relationship between a UC Stepand a component (rule, form, object, iface)
15. 'objectrelationship' - Relationship of a Business Object 
16. 
17. 'category' – A Category of Simple Requirements
18. 'simple' – A Simple Requirement (e.g. an unstructured text requirement)
19. 'statetransition' – A State Transition (Transition from one State to another for a Business Object).
20. 'glossary'- A term in the Glossary
21. 'basic' – A Basic Requirement
22. 'trace' – A link between a Basic Requirement and another Object

