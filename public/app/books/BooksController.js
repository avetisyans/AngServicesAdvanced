(function() {

    angular.module('app')
        .controller('BooksController', ['books', 'dataService', 'logger', 'badgeService', '$cookies', '$cookieStore', '$log', '$route', 'BooksResource','currentUser', BooksController]);


    function BooksController(books, dataService, logger, badgeService, $cookies, $cookieStore, $log, $route, BooksResource, currentUser) {

        var vm = this;
        
        vm.appName = books.appName;
        
        dataService.getUserSummary()
            .then(getUserSummarySuccess);
        
        function getUserSummarySuccess(summaryData) {
            console.log(summaryData);
            vm.summaryData = summaryData;
        }
        
/*        dataService.getAllBooks()
            .then(getBooksSuccess, null, getBooksNotification)
            .catch(errorCb)
            .finally(getAllBooksComplete);*/
        
        vm.allBooks = BooksResource.query();
        
        function getBooksSuccess(books) {
            //throw 'erro in success handler';
            vm.allBooks = books;
        }
        
        function getBooksError(reason) {
            console.log(reason);
        }
        
        function errorCb(errorMsg) {
            console.log('Error Message:' + errorMsg);
        }
        
        function getBooksNotification(notification) {
            //console.log(notification);
        }
        
        function getAllBooksComplete() {
            //console.log('competed!!!');
        }
        
        dataService.getAllReaders()
            .then(getReadersSuccess)
            .catch(errorCb)
            .finally(getAllReadersComplete);
        
        function getReadersSuccess(readers) {
            vm.allReaders = readers;
            $log.awesome('All readers retrieved');
        }
        
        function getAllReadersComplete() {
            console.log('allReaders has been complete!!!');
        }
        
        vm.deleteBook = function(bookID) {
            dataService.deleteBook(bookID)
                .then(deleteBookSuccess)
                .catch(deleteBookError);
        }
        
        function deleteBookSuccess(message) {
            $log.info(message);
            $route.reload();
        }
        
        function deleteBookError(errorMessage) {
            $log.error(errorMessage);
        }
        
        vm.getBadge = badgeService.retrieveBadge;
        
        vm.favouriteBook = $cookies.favouriteBook;
        
        //vm.lastEdited = $cookieStore.get('lastEdited');
        vm.currentUser = currentUser;
        $log.debug('currentUser',currentUser);
        
        $log.info('info');
        $log.debug('aaa');

    }


}());