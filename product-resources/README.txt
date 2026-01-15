LEAF2ROOT - QR CODE PRODUCT RESOURCES SYSTEM
============================================

How This System Works:
---------------------
When customers purchase a physical product (workbook, card deck, etc.),
you can include a QR code on the product that links to bonus digital
resources on your website.

The QR code should link to:
  https://leaf2root.org/product-resources/[product-name].html

For example:
- Grounding Techniques Deck -> /product-resources/grounding-deck.html
- CBT Workbook -> /product-resources/cbt-workbook.html
- DBT Skills Kit -> /product-resources/dbt-kit.html


Setting Up a New Product Resource Page:
--------------------------------------
1. Copy the template.html file and rename it with your product name
   Example: cbt-workbook.html

2. Update the following in your new file:
   - Page title in <title> tag
   - Product name in the welcome banner <h1>
   - Product description in the welcome banner <p>
   - Product image/icon in .product-image
   - Product details (name, type, audience)
   - Description paragraph in .product-info

3. Customize the resources section:
   - Add/remove video tutorials
   - Add/remove downloadable PDFs, worksheets, audio files
   - Update the "Tips" section with product-specific advice

4. Upload your actual resource files to your hosting:
   - PDFs -> /product-resources/files/[product-name]/
   - Audio -> /product-resources/audio/[product-name]/
   - Video -> Embed from YouTube/Vimeo or self-host

5. Update download links to point to actual files:
   <a href="/product-resources/files/grounding-deck/quick-guide.pdf" class="download-btn">


Creating QR Codes:
-----------------
Free QR code generators:
- qr-code-generator.com
- goqr.me
- qrcode-monkey.com

Best practices:
- Use a high-error-correction level for print
- Test the QR code before printing products
- Include a short text URL under the QR code as backup
- Consider using a URL shortener for cleaner codes


Files in This Folder:
--------------------
template.html       - Blank template for new product pages
grounding-deck.html - Example: 54-Card Grounding Techniques Deck resources


Adding Resource Links to Shop Page:
----------------------------------
Add this code inside the product card, after the product-footer div:

<a href="/product-resources/[product-name].html" class="resource-link">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
    Already own this? Access bonus resources
</a>

The CSS for .resource-link is already included in shop.html.


Questions?
---------
Contact: support@leaf2root.org
Parent Company: Family Solutions Counseling
Website: familysolutionsutah.org
