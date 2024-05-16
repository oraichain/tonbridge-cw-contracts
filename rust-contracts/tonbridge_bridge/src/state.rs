use cw_storage_plus::{Index, IndexList, IndexedMap, Map, MultiIndex};

use cw_controllers::Admin;
use tonbridge_bridge::state::{ChannelKey, ChannelState, MappingMetadata};
use tonbridge_parser::types::Bytes32;

/// Owner admin
pub const OWNER: Admin = Admin::new("owner");

// Store processed txs to prevent replay attack
pub const PROCESSED_TXS: Map<&Bytes32, bool> = Map::new("processed_txs");

// =============================== Reference from: https://github.com/oraichain/ibc-bridge-wasm.git
/// This channel state is used when a REMOTE chain initiates ibc transfer to LOCAL chain
/// LOCAL chain is the chain hosting this smart contract.
pub const REMOTE_INITIATED_CHANNEL_STATE: Map<ChannelKey, ChannelState> =
    Map::new("remote_initiated_channel_state");

// MappingMetadataIndexex structs keeps a list of indexers
pub struct MappingMetadataIndexex<'a> {
    // token.identifier
    pub asset_info: MultiIndex<'a, String, MappingMetadata, String>,
}

// IndexList is just boilerplate code for fetching a struct's indexes
impl<'a> IndexList<MappingMetadata> for MappingMetadataIndexex<'a> {
    fn get_indexes(&'_ self) -> Box<dyn Iterator<Item = &'_ dyn Index<MappingMetadata>> + '_> {
        let v: Vec<&dyn Index<MappingMetadata>> = vec![&self.asset_info];
        Box::new(v.into_iter())
    }
}

pub fn ics20_denoms<'a>() -> IndexedMap<'a, &'a str, MappingMetadata, MappingMetadataIndexex<'a>> {
    let indexes = MappingMetadataIndexex {
        asset_info: MultiIndex::new(
            |_k, d| d.asset_info.to_string(),
            "ton_ics20_mapping_namespace",
            "asset__info",
        ),
    };
    IndexedMap::new("ics20_mapping_namespace", indexes)
}
