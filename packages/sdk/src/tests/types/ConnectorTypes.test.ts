import {
    ConnectorMapping,
    ConnectorMappingDirection,
    ConnectorMappingSource,
} from '../../types/ConnectorTypes';

describe('ConnectorMapping', () => {
    it('sets sourceField for variable engineToConnector mappings', () => {
        const mapping = new ConnectorMapping(
            'productName',
            ConnectorMappingSource.variable,
            '6B29FC40-CA47-1067-B31D-00DD010662DA',
            ConnectorMappingDirection.engineToConnector,
            'name',
        );

        expect(mapping).toMatchObject({
            name: 'productName',
            value: 'var.6B29FC40-CA47-1067-B31D-00DD010662DA',
            id: '6B29FC40-CA47-1067-B31D-00DD010662DA',
            type: ConnectorMappingSource.variable,
            sourceField: 'name',
            direction: ConnectorMappingDirection.engineToConnector,
        });
    });

    it('does not set sourceField for value mappings', () => {
        const mapping = new ConnectorMapping('plain', ConnectorMappingSource.value, 'plain value');

        expect(mapping).toMatchObject({
            name: 'plain',
            value: 'plain value',
            type: ConnectorMappingSource.value,
            direction: ConnectorMappingDirection.engineToConnector,
        });
        expect(mapping.sourceField).toBeUndefined();
    });

    it('sets connectorToEngine direction when passed as the fourth argument', () => {
        const mapping = new ConnectorMapping(
            'price',
            ConnectorMappingSource.variable,
            '6B29FC40-CA47-1067-B31D-00DD010662DA',
            ConnectorMappingDirection.connectorToEngine,
        );

        expect(mapping).toMatchObject({
            name: 'price',
            value: 'var.6B29FC40-CA47-1067-B31D-00DD010662DA',
            id: '6B29FC40-CA47-1067-B31D-00DD010662DA',
            type: ConnectorMappingSource.variable,
            direction: ConnectorMappingDirection.connectorToEngine,
        });
        expect(mapping.sourceField).toBeUndefined();
    });
});
