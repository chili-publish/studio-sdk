declare module 'grafx-studio-actions' {
    global {
        /**
         * Studio root object is globally available inside actions
         */
        const studio: ActionApi;

        /**
         * The trigger that caused this action to execute.
         */
        const triggers: Triggers;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const console: Console;
    }

    /**
     * The event types that can trigger an Action to be executed.
     */
    export enum TriggerEventType {
        selectedLayoutChanged = 'selectedLayoutChanged',
        frameMoved = 'frameMoved',
        variableValueChanged = 'variableValueChanged',
        pageSizeChanged = 'pageSizeChanged',
        documentLoaded = 'documentLoaded',
    }

    /**
     * An interface representing the trigger for executing this action.
     */
    export interface Triggers {
        /**
         * The event type that fired this trigger.
         */
        readonly type: TriggerEventType;

        /**
         * If the event was 'variableValueChanged', this will contain the
         * variable that caused the trigger to fire.
         */
        readonly changedVariable?: Variable;

        /**
         * If the event was 'selectedLayoutChanged', this will contain the
         * layout that caused the trigger to fire.
         */
        readonly changedLayout?: Layout;

        /**
         * If the event was 'frameMoved', this will contain the
         * frame that caused the trigger to fire.
         */
        readonly changedFrame?: Frame;

        /**
         * If the event was 'pageSizeChanged', this will contain the
         * page that caused the trigger to fire.
         */
        readonly changedPage?: Page;
    }

    export interface Console {
        log(...data: unknown[]): void;
    }

    /**
     * An interface representing the API for working with actions.
     * Provides access to objects for manipulating frames, variables,
     * layouts, page and stylekit properties.
     */
    export interface ActionApi {
        /** An object for manipulating frames */
        frames: FramesController;
        /** An object for manipulating variables */
        variables: VariablesController;
        /** An object for manipulating layouts */
        layouts: LayoutsController;
        /** An object for manipulating the pages */
        pages: PageController;
        /** An object for manipulating stylekit items */
        stylekit: Stylekit;
    }

    /**
     * All Studio objects that have a name will implement this interface.
     */
    export interface HasName {
        readonly name: string;
    }

    /**
     * Represents a Frame inside Actions
     */
    export interface Frame extends HasName {
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        readonly rotation: number;
        readonly isVisible: boolean;
        readonly type: FrameType;
    }

    export interface FrameMethods {
        /**
         * Moves a frame to a specified position
         * @param x the frame x position
         * @param y the frame y position
         * @returns
         */
        move(x: number | VariableValue, y: number | VariableValue): void;

        /**
         * Resizes a frame to a specified size
         * @param width the frame width
         * @param height the frame height
         * @returns
         */
        resize(width: number | VariableValue, height: number | VariableValue): void;

        /**
         * Moves a frame to a specified X position
         * @param x the frame x position
         * @returns
         */
        setX(x: number | VariableValue): void;

        /**
         * Moves a frame to a specified Y position
         * @param y the frame y position
         * @returns
         */
        setY(y: number | VariableValue): void;

        /**
         * Resizes a frame to a specified width
         * @param width the frame width
         * @returns
         */
        setWidth(width: number | VariableValue): void;

        /**
         * Resizes a frame to a specified height
         * @param height the frame height
         * @returns
         */
        setHeight(height: number | VariableValue): void;

        /**
         * Rotates a frame to a specified degree
         * @param rotation the frame rotation in degrees
         * @returns
         */
        setRotation(rotation: number | VariableValue): void;

        /**
         * Toggles the frame visibility
         * @param isVisible whether the frame is visible or not
         * @returns
         */
        setVisible(isVisible: boolean | VariableValue): void;
    }

    /**
     * Represents a Frame inside Actions
     * Contains frame methods that can be executed on this instance.
     */
    export type FrameWithMethods = Frame & FrameMethods;

    /**
     * Represents a Page inside Actions.
     */
    export interface Page {
        readonly width: number;
        readonly height: number;
    }

    export interface PageMethods {
        /**
         * Sets the size of the page
         * @param width the page width
         * @param height the page height
         * @returns
         */
        setSize(width: number | VariableValue, height: number | VariableValue): void;
    }

    /**
     * Represents a Page inside Actions.
     * Also contains the page specific methods.
     */
    export type PageWithMethods = Page & PageMethods;

    /**
     * Respresents a Layout inside Actions
     */
    export interface Layout extends HasName {
        readonly width: number;
        readonly height: number;
    }

    export interface LayoutMethods {
        /**
         * Selects this layout
         * @returns
         */
        select(): void;
    }

    /**
     * Respresents a Layout inside Actions
     * Contains layout specific methods
     */
    export type LayoutWithMethods = Layout & LayoutMethods;

    /**
     * Respresents a Variable inside Actions
     */
    export type Variable =
        | ShortTextVariable
        | LongTextVariable
        | FormattedTextVariable
        | ImageVariable
        | ListVariable
        | BooleanVariable
        | GroupVariable;

    export interface VariableMethods {
        /**
         * Sets the value of a variable
         * @param value the value
         * @returns
         */
        setValue(value?: VariableValue): void;

        /**
         * Set the readonly state of a variable
         * @param value whether the variable is readonly
         * @returns
         */
        setReadonly(value: boolean | VariableValue): void;

        /**
         * Set the required state of a variable
         * @param value whether the variable is required
         * @returns
         */
        setRequired(value: boolean | VariableValue): void;

        /**
         * Set the visible state of a variable
         * @param isVisible whether the variable is visible
         * @returns
         */
        setVisible(isVisible: boolean | VariableValue): void;
    }

    /**
     * Respresents a Variable inside Actions.
     * Has variable instance specific methods.
     */
    export type VariableWithMethods = Variable & VariableMethods;

    export enum VariableType {
        shortText = 'shortText',
        longText = 'longText',
        formattedText = 'formattedText',
        image = 'image',
        list = 'list',
        boolean = 'boolean',
        group = 'group',
    }

    export enum FrameType {
        text = 'text',
        shape = 'shape',
        image = 'image',
    }

    /**
     * The different values a Variable can have depending on the Variable Type.
     */
    export type VariableValue = string | boolean | number;

    export interface BaseVariable extends HasName {
        readonly isVisible: boolean;
        readonly isReadonly: boolean;
        readonly isRequired: boolean;
        readonly type: VariableType;
        /**
         * The value of the current variable
         */
        readonly value: VariableValue;
    }

    export interface ShortTextVariable extends BaseVariable {
        readonly type: VariableType.shortText;
    }

    export interface LongTextVariable extends BaseVariable {
        readonly type: VariableType.longText;
    }

    export interface FormattedTextVariable extends BaseVariable {
        readonly type: VariableType.formattedText;
    }

    export interface ImageVariable extends BaseVariable {
        readonly type: VariableType.image;
    }

    export interface ListVariable extends BaseVariable {
        readonly type: VariableType.list;
        readonly items: string[];
        readonly selected?: string;
    }

    export interface BooleanVariable extends BaseVariable {
        readonly type: VariableType.boolean;
    }

    export interface GroupVariable extends BaseVariable {
        readonly type: VariableType.group;
    }

    /**
     * Controller responsible for manipulating frames using Actions.
     */
    export interface FramesController {
        /**
         * Moves a frame to a specified position
         * @param name the frame name to move
         * @param x the frame x position
         * @param y the frame y position
         * @returns
         */
        move(name: string | Frame, x: number | VariableValue, y: number | VariableValue): void;

        /**
         * Resizes a frame to a specified size
         * @param name the frame name to resize
         * @param width the frame width
         * @param height the frame height
         * @returns
         */
        resize(name: string | Frame, width: number | VariableValue, height: number | VariableValue): void;

        /**
         * Moves a frame to a specified X position
         * @param name the frame name to move
         * @param x the frame x position
         * @returns
         */
        setX(name: string | Frame, x: number | VariableValue): void;

        /**
         * Moves a frame to a specified Y position
         * @param name the frame name to move
         * @param y the frame y position
         * @returns
         */
        setY(name: string | Frame, y: number | VariableValue): void;

        /**
         * Resizes a frame to a specified width
         * @param name the frame name to resize
         * @param width the frame width
         * @returns
         */
        setWidth(name: string | Frame, width: number | VariableValue): void;

        /**
         * Resizes a frame to a specified height
         * @param name the frame name to resize
         * @param height the frame height
         * @returns
         */
        setHeight(name: string | Frame, height: number | VariableValue): void;

        /**
         * Rotates a frame to a specified degree
         * @param name the frame name to rotate
         * @param rotation the frame rotation in degrees
         * @returns
         */
        setRotation(name: string | Frame, rotation: number | VariableValue): void;

        /**
         * Toggles the frame visibility
         * @param name the frame name to show/hide
         * @param isVisible whether the frame is visible or not
         * @returns
         */
        setVisible(name: string | Frame, isVisible: boolean | VariableValue): void;

        /**
         * Returns a list of all Frames
         * @returns
         */
        all(): FrameWithMethods[];

        /**
         * Returns a specific frame by name
         * @param name the frame name
         * @returns
         */
        byName(name: string | Frame): FrameWithMethods;
    }

    /**
     * Controller responsible for manipulating variables using Actions.
     */
    export interface VariablesController {
        /**
         * Gets a variable by name
         * @param name the variable name
         * @returns
         */
        byName(name: string | Variable): VariableWithMethods;

        /**
         * Returns a list of all variables
         * @returns
         */
        all(): VariableWithMethods[];

        /**
         * Sets the value of a variable
         * @param name the variable name
         * @param value the value
         * @returns
         */
        setValue(name: string | Variable, value?: VariableValue): void;

        /**
         * Gets the value of a variable
         */
        getValue(name: string | Variable): VariableValue;

        /**
         * Set the readonly state of a variable
         * @param name the variable name
         * @param value whether the variable is readonly
         * @returns
         */
        setReadonly(name: string | Variable, value: boolean | VariableValue): void;

        /**
         * Set the required state of a variable
         * @param name the variable name
         * @param value whether the variable is required
         * @returns
         */
        setRequired(name: string | Variable, value: boolean | VariableValue): void;

        /**
         * Set the visible state of a variable
         * @param name the variable name
         * @param isVisible whether the variable is visible
         * @returns
         */
        setVisible(name: string | Variable, isVisible: boolean | VariableValue): void;
    }

    /**
     * Controller responsible for manipulating layouts using Actions.
     */
    export interface LayoutsController {
        /**
         * Returns the selected layout
         * @returns
         */
        getSelected(): LayoutWithMethods;

        /**
         * Selects a layout by name
         * @param layoutName the layout name to select
         * @returns
         */
        select(layoutName: string | Layout | VariableValue): void;

        /**
         * Returns all layouts in the document.
         */
        all(): LayoutWithMethods[];

        /**
         * Returns a specific layout by name
         * @param name the layout name
         * @returns
         */
        byName(name: string | Layout | VariableValue): LayoutWithMethods;
    }

    /**
     * Controller responsible for manipulating pages using Actions.
     */
    export interface PageController {
        /**
         * Gets the size of the page
         * @returns the page size
         */
        getSize(): PageWithMethods;

        /**
         * Sets the size of the page
         * @param width the page width
         * @param height the page height
         * @returns
         */
        setSize(width: number | VariableValue, height: number | VariableValue): void;
    }

    /**
     *  Grouping stylekit entities.
     */
    export interface Stylekit {
        /**
         * An object to manipulate stylekit colors.
         */
        readonly colors: StylekitColorsController;

        /**
         * An object to manipulate stylekit paragraph styles.
         */
        readonly paragraphStyles: StylekitParagraphStylesController;

        /**
         * An object to manipulate stylekit character styles.
         */
        readonly characterStyles: StylekitChacterStylesController;
    }

    /**
     * Controller for manipulating stylekit colors.
     */
    export interface StylekitColorsController {
        /**
         * Copies a stylekit color
         * @param fromName the color to use as source
         * @param toName the color to copy it to
         * @returns
         */
        copy(fromName: string | VariableValue, toName: string | VariableValue): void;
    }

    /**
     * Controller for manipulating stylekit paragraph styles.
     */
    export interface StylekitParagraphStylesController {
        /**
         * Copies a paragraph style
         * @param fromName the paragraph style to use as source
         * @param toName the paragraph style to copy it to
         * @returns
         */
        copy(fromName: string | VariableValue, toName: string | VariableValue): void;
    }

    /**
     * Controller for manipulating stylekit character styles.
     */
    export interface StylekitChacterStylesController {
        /**
         * Copies a character style
         * @param fromName the character style to use as source
         * @param toName the character style to copy it to
         * @returns
         */
        copy(fromName: string | VariableValue, toName: string | VariableValue): void;
    }
}
