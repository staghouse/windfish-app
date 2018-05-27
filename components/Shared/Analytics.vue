<template lang="pug">
#analytics
    #google_translate_element
    script.
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
        }
    script(
        type="text/javascript",
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit")
</template>
<script>
export default {
    name: 'Analytics',
};
</script>
