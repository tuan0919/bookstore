'use strict';

const loadProducts = async function () {
  const elements = document.querySelectorAll('#products_grid .item-inner');

  const results = await Promise.all(
      Array.from(elements).map(async (element) => {
        try {
          const linkElement = element.querySelector('.product.images-container a');
          if (!linkElement) {
            return null;
          }

          const url = linkElement.href;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${url}`);
          }

          const data = await response.text();
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(data, 'text/html');

          const imageElements = htmlDoc.querySelectorAll('#lightgallery-product-media a');
          const images = Array.from(imageElements).map(a => a.href);

          const rawTitle = htmlDoc.querySelector('.block-content-product-detail h1')?.textContent.trim() || '';
          const title = rawTitle.replace(/\s+/g, ' ').trim();
          const description = htmlDoc.querySelector('#desc_content')?.outerHTML.trim() || '';

          const qtyInStock = getRandomQuantity();
          const price = getOldPrice(htmlDoc);
          const category = "MangaJP"

          // Các trường thông tin
          const productCode = getXPathText(htmlDoc, 'Mã hàng');
          const supplier = getXPathText(htmlDoc, 'Tên Nhà Cung Cấp');
          const author = getXPathText(htmlDoc, 'Tác giả');
          const translator = getXPathText(htmlDoc, 'Người Dịch');
          const publisher = getXPathText(htmlDoc, 'NXB');
          const publishYear = getXPathText(htmlDoc, 'Năm XB');
          const language = getXPathText(htmlDoc, 'Ngôn Ngữ');
          const weight = getXPathText(htmlDoc, 'Trọng lượng');
          const size = getXPathText(htmlDoc, 'Kích Thước Bao Bì');
          const pageCount = getXPathText(htmlDoc, 'Số trang');
          const format = getXPathText(htmlDoc, 'Hình thức');
          const countdown = getXPathText(htmlDoc, 'Đếm ngược thời gian');
          const age = getAge(htmlDoc);
          const genres = getXPathText(htmlDoc, 'Genres');
          return {
            Books: {
              title,
              publisher,
              publishYear,
              weight,
              productCode,
              supplier,
              author,
              language,
              pageCount,
              translator,
              size,
              countdown,
              format,
              age,
              description,
              qtyInStock,
              price,
              images,
              category,
              genres
            }
          };
        } catch (error) {
          console.error('Error loading product:', error);
          return null;
        }
      })
  );

  console.log(JSON.stringify(results));
};

loadProducts();

// Hàm lấy text theo nhãn trong bảng thông tin
function getXPathText(htmlDoc, labelText) {
  const xpath = `//table[contains(@class, 'table-additional')]//tr[th[contains(text(), "${labelText}")]]/td`;
  const result = htmlDoc.evaluate(xpath, htmlDoc, null, XPathResult.STRING_TYPE, null);
  return result.stringValue.trim();
}

// ✅ Hàm lấy độ tuổi
function getAge(htmlDoc) {
  const xpath = `//div[starts-with(@class, 'product-view-sa-author')]/span[contains(text(), 'Độ tuổi')]/following-sibling::span[1]/text()`;
  const result = htmlDoc.evaluate(xpath, htmlDoc, null, XPathResult.STRING_TYPE, null);
  return result.stringValue.trim();
}

// ✅ Hàm lấy giá cũ từ selector "p .old-price span[class='price']"
function getOldPrice(htmlDoc) {
  const oldPriceEl = htmlDoc.querySelector('p.old-price span.price');
  if (!oldPriceEl) return 0;
  const priceText = oldPriceEl.textContent.replace(/[^\d.]/g, '');
  return parseFloat(priceText) || 0;
}

function getRandomQuantity(min = 50, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
