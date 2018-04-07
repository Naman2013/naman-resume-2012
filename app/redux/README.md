#About /Redux

## Future place for /modules

We are not sure who originally decided on /modules, however it is preferred to
use /redux for anything redux related.

## Experimental State Management Design through Redux Components (state/g-state component)

You may also find directories like /components within the /redux directory.
As typical of the industry, folks tend to agree on having display components
and container components.  Container components become hard wired to the
state design of the application.

#### problem

Deeply nested or complex component hierarchies become tangled in their outer
dependencies.  Meaning, that a component that is two or more levels deep in a
hierarchy the containing components become dependant on the container component
which depends on the global state.

#### experimental design and resolving the component conflict of interest

Child components that are responsible for actions force parent components
to also need to care about how the action will be made available to the child
component.

#### Goals

- To maintain the clean presentational component.

- To allow for containers or compositional elements to be free from needing
to care about ACTIONS or ACTION creators.

#### Redux components

Redux components say they deal with the connection and provide the functionality
to inclusion of composition.

Redux components should not have any say on the style...  They may provide the appropriate
DOM element root type - such as <button> or <a>.

Some SLA should be designed around how to work and style these components.

