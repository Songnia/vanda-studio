<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['gallery_id', 'file_path', 'thumbnail_path', 'order_column'];

    public function gallery()
    {
        return $this->belongsTo(Gallery::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    protected $appends = ['url', 'thumbnail_url', 'is_liked'];

    protected $casts = [
        'is_liked' => 'boolean',
    ];

    public function getUrlAttribute()
    {
        return $this->file_path;
    }

    public function getIsLikedAttribute()
    {
        return (bool) ($this->attributes['is_liked'] ?? false);
    }

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail_path;
    }
}
