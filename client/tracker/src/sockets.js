import { generateStateItemUpdateData } from './utils';

const sockets = {
    connect: function() {
        this.$store.dispatch('update socket connection', true);
    },
    disconnect: function() {
        this.$store.dispatch('update socket connection', false);
    },
    'update whitelist add': function(user) {
        let whitelist = this.$botWhitelist.add(user);

        this.$socket.emit('update bot whitelist', whitelist);
    },
    'update whitelist remove': function(user) {
        let whitelist = this.$botWhitelist.remove(user);

        this.$socket.emit('update bot whitelist', whitelist);
    },
    'update broadcast data': function(newItemData) {
        this.$store.dispatch('update broadcast data', newItemData);
    },
    'update tracker data': function(userData) {
        let self = this;
        let dataToUpdate = generateStateItemUpdateData(
            self.$store.getters.items,
            userData.argument2
        );

        if (dataToUpdate.index !== null && dataToUpdate.item !== null) {
            userData.resolved = true;
            self.$store
                .dispatch('update item data', dataToUpdate)
                .then(() => {
                    self.$socket.emit('bot dequeue', userData);

                    self.$socket.emit(
                        'send broadcast data',
                        self.$store.getters.items
                    );
                })
                .catch(error => {
                    console.log('Promise failed: ' + error);
                });
        } else {
            userData.resolved = false;
            self.$socket.emit('bot dequeue', userData);
        }
    },
};

export default sockets;
