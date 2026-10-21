# Interactive Digital Logic & Electronics Lab

A browser-based educational project for exploring digital logic gates
and experimenting with simplified electronic circuits. It is built with
**HTML5, CSS3, and vanilla JavaScript**.

## Features

### Logic Gate Simulator

-   Supports AND, OR, NOT, NAND, NOR, XOR, and XNOR gates.
-   Toggle binary inputs between `0` and `1`.
-   Calculates the output when inputs change.
-   Displays the Boolean expression and a truth table.
-   Highlights the active truth-table row.

### Circuit Workspace

-   Add components such as batteries, resistors, LEDs, diodes, switches,
    ammeters, voltmeters, and logic inputs.
-   Move components around the workspace.
-   Connect component terminals with wires.
-   Choose red or black wire colors.
-   Edit supported component parameters.
-   Remove components, undo/redo changes, reset the circuit, and run the
    simulation.
-   View component state, voltage, current, and connection information
    in a table.
-   Read simulation messages and warnings in the simulation log.

### Technology

-   **HTML5** --- page structure
-   **CSS3** --- layout and component presentation
-   **Vanilla JavaScript (ES6+)** --- logic gate calculations, workspace
    interactions, and simplified circuit simulation
-   **SVG** --- component drawings and wire rendering

No framework or build step is required.

## Project Files

``` text
project-folder/
├── index.html   # Main page and application structure
├── style.css    # Layout and visual presentation
├── script.js    # Logic gates, circuit workspace, and simulation logic
└── README.md    # Project documentation
```

## Run Locally

1.  Download or clone the project files.
2.  Keep `index.html`, `style.css`, and `script.js` in the same folder.
3.  Open `index.html` in a modern browser such as Chrome, Edge, or
    Firefox.
4.  Select **Logic Gates** to test gates, or **Circuit Workspace** to
    experiment with components.

The project is designed to run locally in the browser and does not
require a backend server or package installation.

## Using the Logic Gate Simulator

1.  Open the **Logic Gates** tab.
2.  Choose a gate from the selector.
3.  Click the input buttons to toggle each input between `0` and `1`.
4.  Observe the calculated output and the highlighted row in the truth
    table.
5.  The NOT gate uses only input A.

## Using the Circuit Workspace

1.  Open the **Circuit Workspace** tab.
2.  Choose a component from **Add Component** and click **Add**.
3.  Move components into position by dragging them.
4.  Enable **Wire Mode**.
5.  Select a wire color, then select the terminals to connect.
6.  Edit component parameters using the component's **Edit** control.
7.  Click **Simulate** and inspect the component table and simulation
    log.

The exact interaction for selecting terminals may depend on the current
workspace implementation. If a wire or component does not behave as
expected, check the browser console for JavaScript errors.

## Electrical Simulation Scope and Limitations

This project is an **educational, simplified simulator**, not a
replacement for professional circuit-design software or a physical
electronics lab.

-   Logic-gate outputs are calculated using Boolean operations.
-   Electrical results depend on the simplified circuit-solving logic
    implemented in `script.js`.
-   Diodes and LEDs use simplified forward-voltage behavior rather than
    detailed semiconductor models.
-   Not every circuit topology or combination of components is
    necessarily supported.
-   Values shown by the simulator should not be treated as
    laboratory-grade measurements.
-   A circuit that has no complete path through a voltage source may be
    reported as an open or incomplete circuit.

### LED safety note

In a real circuit, do not connect a typical LED directly across a 9 V
battery without a suitable current-limiting resistor. Excess current can
damage the LED. The software's simulated LED state does not make a
real-world circuit electrically safe.

## Troubleshooting

**The LED stays OFF** - Confirm that the battery, LED, and any required
resistor are connected in a complete circuit. - Check polarity: connect
the battery positive terminal toward the LED anode (`A`) and the LED
cathode (`K`) toward the negative terminal. - Add a suitable series
resistor. - Click **Simulate** and read the simulation log.

**The log says no closed circuit loops were found** - Check that both
battery terminals are connected through the circuit. - Confirm that
wires are attached to the intended terminals rather than just crossing
visually. - Check for an open switch or a disconnected wire.

**The page does not respond** - Confirm that all three files are in the
same directory. - Open the browser developer tools and inspect the
Console for errors. - Reload the page after replacing project files.

## Development Notes

-   Keep the project framework-free unless there is a deliberate
    decision to change the technology requirements.
-   When modifying the simulator, test both valid and invalid circuits.
-   Do not assume a circuit is supported merely because its components
    can be drawn and connected.
-   Verify calculations and component behavior before relying on the
    displayed measurements.

## License

No license is specified in this project yet. Add a license file if you
plan to publish or distribute the project and want to define how others
may use it.
