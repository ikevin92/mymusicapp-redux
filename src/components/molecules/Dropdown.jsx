

const Dropdown = ( props ) => {

    console.log( props );

    const { options } = props;

    const handleOnChange = ( e ) => {
        console.log( e.target.value );
        props.changed( e.target.value );
    };

    return (
        <div>
            <select value={ props.selectedValue } onChange={ handleOnChange }>
                { options.map( ( item, id ) =>
                    <option key={ item.id } value={ item.id }>{ item.name }</option>
                ) }
            </select>
        </div>
    );
};

export default Dropdown;
