#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts PNG/JPG images to WebP format for better performance
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
try {
  const sharp = require('sharp');
  
  const PUBLIC_DIR = path.join(process.cwd(), 'public');
  
  const imagesToOptimize = [
    { input: 'hero-banner.png', output: 'hero-banner.webp', quality: 80 },
    { input: 'logo.png', output: 'logo.webp', quality: 85 },
  ];
  
  async function optimizeImages() {
    console.log('🖼️  Optimizing images...\n');
    
    for (const { input, output, quality } of imagesToOptimize) {
      const inputPath = path.join(PUBLIC_DIR, input);
      const outputPath = path.join(PUBLIC_DIR, output);
      
      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  ${input} not found, skipping...`);
        continue;
      }
      
      const inputStats = fs.statSync(inputPath);
      const inputSizeKB = (inputStats.size / 1024).toFixed(1);
      
      try {
        await sharp(inputPath)
          .webp({ quality, effort: 6 })
          .toFile(outputPath);
        
        const outputStats = fs.statSync(outputPath);
        const outputSizeKB = (outputStats.size / 1024).toFixed(1);
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
        
        console.log(`✅ ${input} → ${output}`);
        console.log(`   Original: ${inputSizeKB} KB`);
        console.log(`   Optimized: ${outputSizeKB} KB`);
        console.log(`   Savings: ${savings}%\n`);
      } catch (error) {
        console.error(`❌ Error converting ${input}:`, error.message);
      }
    }
    
    console.log('✨ Image optimization complete!');
  }
  
  optimizeImages().catch(console.error);
  
} catch (error) {
  console.error('❌ Sharp not installed. Run: npm install --save-dev sharp');
  process.exit(1);
}
